// AuthWrapper.js
import supabase from 'src/config/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { useState, useEffect } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const getUserInfo = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user details:', error);
    return null;
  }

  return data;
};

export const getLoggedInUserDetails = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching logged-in user details:', error);
    return null;
  }

  return data.user;
};

export const logout = async () => {
  let navigate = useNavigate();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
  navigate('/');
};

export const AuthWrapper = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCookie('userId', session.user.id); // Set user ID in cookie for 7 days
      }
      setLoading(false);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setCookie('userId', session.user.id); // Set user ID in cookie for 7 days
      } else {
        removeCookie('userId');
      }
      setLoading(false); // Set loading to false once session is updated
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <SuspenseLoader />; // Render a loading spinner or placeholder
  }

  if (!session) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    );
  } else {
    return children;
  }
};
