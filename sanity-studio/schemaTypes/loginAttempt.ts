import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'loginAttempt',
  title: 'Login Attempts',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'success',
      title: 'Success',
      type: 'boolean',
      description: 'Whether the login was successful',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'IP address of the login attempt',
    }),
    defineField({
      name: 'attemptedAt',
      title: 'Attempted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'email',
      success: 'success',
    },
    prepare({title, success}) {
      return {
        title: title,
        subtitle: success ? '✓ Successful' : '✗ Failed',
      }
    },
  },
})
