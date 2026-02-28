import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'propertyInquiry',
  title: 'Property Inquiries',
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
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'propertyId',
      title: 'Property ID',
      type: 'string',
    }),
    defineField({
      name: 'propertyTitle',
      title: 'Property Title',
      type: 'string',
    }),
    defineField({
      name: 'propertyPrice',
      title: 'Property Price',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Scheduled Viewing', value: 'scheduled'},
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
      title: 'fullName',
      subtitle: 'propertyTitle',
      email: 'email',
    },
    prepare({title, subtitle, email}) {
      return {
        title: title,
        subtitle: `${subtitle} - ${email}`,
      }
    },
  },
})
