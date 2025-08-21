'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useApi } from '../../../hooks/useApi';

export default function Submissions() {
  const { data: session } = useSession();
  const { apiCall } = useApi();
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [assignmentTitle, setAssignmentTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          // Fetch assignment details
          const assignmentRes = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/assignments/${assignmentId}`);
          if (assignmentRes.ok) {
            const assignmentData = await assignmentRes.json();
            setAssignmentTitle(assignmentData.title || 'Untitled Assignment');
          }

          // Fetch submissions
          const submissionsRes = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions?assignmentId=${assignmentId}`);
          const submissionsData = await submissionsRes.json();
          setSubmissions(submissionsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [session, assignmentId, apiCall]);

  const handleUpdate = async (submissionId) => {
    setIsLoading(true);
    try {
      const res = await apiCall(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions/${submissionId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: status[submissionId] || 'pending',
          feedback: feedback[submissionId] || '',
        }),
      });
      if (res.ok) {
        // Update local state
        const updatedSubmissions = submissions.map((sub) =>
          sub.id === submissionId
            ? { ...sub, status: status[submissionId], feedback: feedback[submissionId] }
            : sub
        );
        setSubmissions(updatedSubmissions);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successMessage.textContent = 'Submission updated successfully!';
        document.body.appendChild(successMessage);
        setTimeout(() => document.body.removeChild(successMessage), 3000);
      }
    } catch (error) {
      console.error('Failed to update submission:', error);
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorMessage.textContent = 'Failed to update submission';
      document.body.appendChild(errorMessage);
      setTimeout(() => document.body.removeChild(errorMessage), 3000);
    }
    setIsLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'rejected':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assignment Submissions</h1>
          <p className="text-gray-600">{assignmentTitle}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600">Total Submissions:</span>
              <span className="ml-2 font-semibold text-gray-900">{submissions.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-gray-600">Pending:</span>
              <span className="ml-2 font-semibold text-yellow-600">
                {submissions.filter(s => s.status === 'pending').length}
              </span>
            </div>
          </div>
        </div>

        {/* Submissions Grid */}
        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Submissions Yet</h3>
              <p className="text-gray-600">Students haven&apos;t submitted their work for this assignment yet.</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{submission.student.username}</h3>
                      <p className="text-sm text-gray-500">Student</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-1 ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submission URL</label>
                    <a 
                      href={submission.submissionUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium break-all"
                    >
                      {submission.submissionUrl}
                    </a>
                  </div>

                  {submission.note && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student Note</label>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{submission.note}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                      <select
                        value={status[submission.id] || submission.status}
                        onChange={(e) => setStatus({ ...status, [submission.id]: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                      <textarea
                        value={feedback[submission.id] || ''}
                        onChange={(e) => setFeedback({ ...feedback, [submission.id]: e.target.value })}
                        placeholder="Provide feedback to the student..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleUpdate(submission.id)}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Updating...
                        </div>
                      ) : (
                        'Update Submission'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}