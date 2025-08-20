// Mock Authentication Service
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  resetToken?: string;
  resetTokenExpiry?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

class MockAuthService {
  private readonly USERS_KEY = 'kpxhub-users';
  private readonly CURRENT_USER_KEY = 'kpxhub-current-user';

  // Get all users from localStorage
  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Generate reset token
  private generateResetToken(): string {
    return Math.random().toString(36).substr(2, 15);
  }

  // Sign Up
  async signUp(name: string, email: string, password: string): Promise<AuthResponse> {
    const users = this.getUsers();
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return { success: false, message: 'User already exists with this email' };
    }

    // Validate input
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return { 
      success: true, 
      message: 'Account created successfully!', 
      user: userWithoutPassword 
    };
  }

  // Sign In
  async signIn(email: string, password: string): Promise<AuthResponse> {
    const users = this.getUsers();
    
    if (!email.trim() || !password.trim()) {
      return { success: false, message: 'Email and password are required' };
    }

    const user = users.find(u => u.email === email.toLowerCase().trim() && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Set current user
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { 
      success: true, 
      message: 'Signed in successfully!', 
      user: userWithoutPassword 
    };
  }

  // Forgot Password
  async forgotPassword(email: string): Promise<AuthResponse> {
    const users = this.getUsers();
    
    if (!email.trim()) {
      return { success: false, message: 'Email is required' };
    }

    const userIndex = users.findIndex(u => u.email === email.toLowerCase().trim());
    
    if (userIndex === -1) {
      return { success: false, message: 'No account found with this email' };
    }

    // Generate reset token (expires in 1 hour)
    const resetToken = this.generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    users[userIndex].resetToken = resetToken;
    users[userIndex].resetTokenExpiry = resetTokenExpiry;
    this.saveUsers(users);

    // In real app, you'd send email here
    console.log(`Reset token for ${email}: ${resetToken}`);
    
    return { 
      success: true, 
      message: 'Password reset instructions sent to your email!' 
    };
  }

  // Reset Password
  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    const users = this.getUsers();
    
    if (!token.trim() || !newPassword.trim()) {
      return { success: false, message: 'Token and new password are required' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    const userIndex = users.findIndex(u => 
      u.resetToken === token && 
      u.resetTokenExpiry && 
      new Date(u.resetTokenExpiry) > new Date()
    );

    if (userIndex === -1) {
      return { success: false, message: 'Invalid or expired reset token' };
    }

    // Update password and clear reset token
    users[userIndex].password = newPassword;
    delete users[userIndex].resetToken;
    delete users[userIndex].resetTokenExpiry;
    this.saveUsers(users);

    return { 
      success: true, 
      message: 'Password reset successfully!' 
    };
  }

  // Get Current User
  getCurrentUser(): Omit<User, 'password'> | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Sign Out
  signOut(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Change Password
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'Not authenticated' };
    }

    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    if (users[userIndex].password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters' };
    }

    users[userIndex].password = newPassword;
    this.saveUsers(users);

    return { success: true, message: 'Password changed successfully!' };
  }
}

export const mockAuth = new MockAuthService();