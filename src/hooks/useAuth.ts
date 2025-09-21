import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { authService, AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<any>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (session?.user) {
      try {
        const profile = await authService.getUserProfile(session.user.id);
        setUser({
          ...session.user,
          profile: profile || undefined
        });
      } catch (error) {
        console.error('Error refreshing profile:', error);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Get user profile data
          try {
            const profile = await authService.getUserProfile(session.user.id);
            setUser({
              ...session.user,
              profile: profile || undefined
            });
          } catch (error) {
            console.error('Error fetching profile:', error);
            setUser(session.user as AuthUser);
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        refreshProfile();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    return await authService.signUp(email, password, fullName, phone);
  };

  const signIn = async (email: string, password: string) => {
    return await authService.signIn(email, password);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const updateProfile = async (updates: any) => {
    if (!session?.user) throw new Error('No authenticated user');
    const result = await authService.updateProfile(session.user.id, updates);
    await refreshProfile(); // Refresh the profile data
    return result;
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
  };
};

export { AuthContext };