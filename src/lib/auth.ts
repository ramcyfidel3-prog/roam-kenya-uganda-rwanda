import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    full_name?: string;
    kyc_status?: string;
    is_admin?: boolean;
    afriroam_number?: string;
    wallet_balance?: number;
    id_number?: string;
    nationality?: string;
    phone_number?: string;
  };
}

// Auth service functions
export const authService = {
  // Sign up new user
  async signUp(email: string, password: string, fullName: string, phone?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName,
          phone_number: phone,
        }
      }
    });

    if (error) throw error;

    // Log the registration
    if (data.user) {
      await this.logAuthAction(data.user.id, 'user_registered');
    }

    return data;
  },

  // Sign in user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Log the login
    if (data.user) {
      await this.logAuthAction(data.user.id, 'user_login');
    }

    return data;
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Update user profile
  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Log authentication action (using existing profiles table for now)
  async logAuthAction(userId: string, action: string) {
    try {
      // For now, we'll log this in the console until auth_logs table is available
      console.log(`Auth Action: ${action} for user ${userId}`);
    } catch (error) {
      console.error('Failed to log auth action:', error);
    }
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  }
};

// Admin functions
export const adminService = {
  // Create admin user (this should be done once manually)
  async createAdminUser(email: string, password: string) {
    // This would typically be done through a separate admin registration process
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: 'Admin User',
          is_admin: true,
        }
      }
    });

    if (error) throw error;

    // Note: Admin flag will be set manually in the database for now

    return data;
  },

  // Check if user is admin (for now just check if email matches admin email)
  async isAdmin(userId: string) {
    try {
      const { data: user } = await supabase.auth.getUser();
      return user.user?.email === 'afriroam@gmail.com';
    } catch {
      return false;
    }
  }
};