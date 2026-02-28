import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Leads',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
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
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          {title: 'Buying a Home', value: 'Buying a Home'},
          {title: 'Selling a Home', value: 'Selling a Home'},
          {title: 'Investment Opportunities', value: 'Investment Opportunities'},
          {title: 'General Inquiry', value: 'General Inquiry'},
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Qualified', value: 'qualified'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email',
      lastName: 'lastName',
    },
    prepare({title, subtitle, lastName}) {
      return {
        title: `${title} ${lastName}`,
        subtitle: subtitle,
      }
    },
  },
})
