import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import ResetPasswordView from 'src/pages/Newpassword';
import ForgotPasswordView from 'src/pages/forgot-password';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/sign-up'));
export const ForgotPasswordPage = lazy(() => import('src/pages/forgot-password'));
export const OtpPage = lazy(() => import('src/pages/otp'));
export const HomePage = lazy(() => import('src/pages/home'));
export const AboutPage = lazy(() => import('src/pages/about'));
export const SecurityPage = lazy(() => import('src/pages/security'));
export const MainDashboardPage = lazy(() => import('src/pages/user-main-dashboard'));
export const UserProfilePage = lazy(() => import('src/pages/user-profile'));
export const SecondaryDashboardPage = lazy(() => import('src/pages/secondary-dashboard'));
export const TermsPage = lazy(() => import('src/pages/terms-and-condition'));
export const ContactPage = lazy(() => import('src/pages/conatct'));
export const PrivacyPage = lazy(() => import('src/pages/privacy'));

export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export const TagVideoRecordsPage = lazy(() => import('src/pages/tag-video-records'));
export const ManageTagVideoRecordsPage = lazy(() => import('src/pages/manage-tag-video-records'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <PublicRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: 'forgot',
      element: (
        <PublicRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordView />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: 'otp',
      element: (
        <PublicRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <OtpPage />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      index: true,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: 'about-us',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AboutPage />
        </Suspense>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <PublicRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordView />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: 'security',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SecurityPage />
        </Suspense>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <PrivateRoute requiredRole="Primary">
          <Suspense fallback={<div>Loading...</div>}>
            <MainDashboardPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: 'user-profile/:id',
      element: (
        <PrivateRoute requiredRole="Primary">
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfilePage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: 'manage-tag-video-records',
      element: (
        <PrivateRoute requiredRole="Primary">
          <Suspense fallback={<div>Loading...</div>}>
            <ManageTagVideoRecordsPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: 'secondary-dashboard',
      element: (
        <PrivateRoute requiredRole="Secondary">
          <Suspense fallback={<div>Loading...</div>}>
            <SecondaryDashboardPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: 'dashboard',
      element: (
        <PrivateRoute requiredRole="Primary">
          <Suspense fallback={<div>Loading...</div>}>
            <MainDashboardPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: 'terms',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <TermsPage />
        </Suspense>
      ),
    },
    {
      path: 'contact',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <ContactPage />
        </Suspense>
      ),
    },
    {
      path: 'privacy',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <PrivacyPage />
        </Suspense>
      ),
    },
    {
      path: '404',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Page404 />
        </Suspense>
      ),
    },
    {
      path: 'tag-video-records',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <TagVideoRecordsPage />
        </Suspense>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
