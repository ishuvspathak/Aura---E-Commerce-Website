import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().min(10, 'Must be 10 characters or more').required('Required')
  });

  const handleSubmit = (values, { resetForm }) => {
    toast.success('Your message has been sent successfully!', {
      style: { borderRadius: '12px', background: '#111827', color: '#fff' }
    });
    resetForm();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {/* Column 1: Info */}
      <div className="space-y-6 lg:col-span-1">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight">Contact Us</h1>
          <p className="text-xs text-gray-550 dark:text-gray-400 mt-1">Get in touch with our team for questions about your order.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><FiMail /></div>
            <div>
              <p className="font-bold">Email Support</p>
              <p className="text-gray-500 dark:text-gray-400">support@aura.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><FiPhone /></div>
            <div>
              <p className="font-bold">Phone helpline</p>
              <p className="text-gray-500 dark:text-gray-400">+1 (555) 019-2834</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><FiMapPin /></div>
            <div>
              <p className="font-bold">Main Headquarters</p>
              <p className="text-gray-500 dark:text-gray-400">123 Aura Blvd, San Francisco, CA</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="p-2.5 bg-accent/10 text-accent rounded-xl"><FiClock /></div>
            <div>
              <p className="font-bold">Helpline Hours</p>
              <p className="text-gray-500 dark:text-gray-400">Mon - Fri • 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2 & 3: Form */}
      <div className="lg:col-span-2 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium">
        <Formik
          initialValues={{ name: '', email: '', subject: '', message: '' }}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Your Name</label>
                  <Field 
                    name="name" 
                    className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 focus:outline-none ${errors.name && touched.name ? 'border-danger' : 'border-gray-205 dark:border-gray-700'}`}
                  />
                  <ErrorMessage name="name" component="span" className="text-[10px] text-danger" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                  <Field 
                    name="email" 
                    type="email"
                    className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 focus:outline-none ${errors.email && touched.email ? 'border-danger' : 'border-gray-205 dark:border-gray-700'}`}
                  />
                  <ErrorMessage name="email" component="span" className="text-[10px] text-danger" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Subject</label>
                <Field 
                  name="subject" 
                  className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 focus:outline-none ${errors.subject && touched.subject ? 'border-danger' : 'border-gray-205 dark:border-gray-700'}`}
                />
                <ErrorMessage name="subject" component="span" className="text-[10px] text-danger" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Message Content</label>
                <Field 
                  name="message" 
                  as="textarea"
                  rows={4}
                  className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 focus:outline-none ${errors.message && touched.message ? 'border-danger' : 'border-gray-205 dark:border-gray-700'}`}
                />
                <ErrorMessage name="message" component="span" className="text-[10px] text-danger" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-xl font-bold shadow-md transition-colors"
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactPage;
