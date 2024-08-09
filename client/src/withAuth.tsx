import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();

        const { isAuthenticated } = useAppSelector((state) => state.auth);

        useEffect(() => {
            if(!isAuthenticated) {
                router.replace('/login');
            }
            }, [isAuthenticated, router]);

            if (!isAuthenticated) {
                return null;
            }

            return <WrappedComponent {...props} />;
        };
        return AuthenticatedComponent;
};

export default withAuth;