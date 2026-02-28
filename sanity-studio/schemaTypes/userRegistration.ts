import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'userRegistration',
  title: 'User Registrations',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      description: 'Hashed password - never store plain text passwords',
      hidden: true, // Hide from Studio UI for security
    }),
    defineField({
      name: 'registrationType',
      title: 'Registration Type',
      type: 'string',
      options: {
        list: [
          {title: 'Email/Password', value: 'email'},
          {title: 'Google', value: 'google'},
          {title: 'GitHub', value: 'github'},
        ],
      },
      initialValue: 'email',
    }),
    defineField({
      name: 'oauthId',
      title: 'OAuth ID',
      type: 'string',
      description: 'ID from OAuth provider (Google/GitHub)',
      hidden: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Inactive', value: 'inactive'},
          {title: 'Suspended', value: 'suspended'},
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registered At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
    },
  },
})
