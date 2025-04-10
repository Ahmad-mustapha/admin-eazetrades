// app/admin/change-password/page.tsx
'use client';

import React, { useState } from 'react';
import ChangePasswordForm from '../../../component/auth/ChangePasswordForm';
import { useRouter } from 'next/navigation'; // Optional: For cancel navigation

const ChangePasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null); // Error specific to API call
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter(); // Optional

  // --- THIS IS WHERE YOUR API LOGIC GOES ---
  const handlePasswordSubmit = async (data: { oldPassword: string; newPassword: string }) => {
    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);
    console.log('Submitting password change:', data);

    try {
      // Replace with your actual API call to change the password
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      const success = Math.random() > 0.3; // Simulate success/failure
      if (!success) {
        throw new Error('Incorrect old password or server error.'); // Simulate API error response
      }

      console.log('Password change successful (simulated)');
      setSuccessMessage('Password successfully updated!');
      // Optionally navigate away after success
      // router.push('/admin/dashboard');

    } catch (error: any) {
      console.error('API call failed:', error);
      setFormError(error.message || 'An unexpected error occurred during password change.');
      // IMPORTANT: Re-throw error so the form component catches it too
      // if you want the form's internal error state to be set.
      // Alternatively, manage all error display here in the page component.
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    console.log('Password change cancelled.');
    // Example: Navigate back or to dashboard
    router.back(); // Or router.push('/admin/dashboard');
  };

  return (
    <div className="p-4 md:p-6 lg:p-8"> {/* Page level padding */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Change Your Password
      </h1>

      {/* Display success message above the form */}
      {successMessage && (
        <div className="mb-4 p-3 text-sm bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

       {/* Display API error message above the form (alternative to form's internal error) */}
       {/* {formError && (
        <div className="mb-4 p-3 text-sm bg-red-100 text-red-700 rounded-md">
          {formError}
        </div>
      )} */}


      {/* Render the form component, passing state and handlers */}
      <ChangePasswordForm
        onSubmit={handlePasswordSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

// Export the Page component as default
export default ChangePasswordPage;