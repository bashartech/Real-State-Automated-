import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homeValuation',
  title: 'Home Valuations',
  type: 'document',
  fields: [
    defineField({
      name: 'propertyAddress',
      title: 'Property Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zipCode',
      title: 'ZIP Code',
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
      name: 'estimatedValue',
      title: 'Estimated Value',
      type: 'number',
      description: 'Agent can add estimated value after review',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New Request', value: 'new'},
          {title: 'Under Review', value: 'reviewing'},
          {title: 'Estimate Sent', value: 'sent'},
          {title: 'Follow-up Scheduled', value: 'scheduled'},
          {title: 'Closed', value: 'closed'},
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Agent Notes',
      type: 'text',
      description: 'Internal notes for the agent',
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
      title: 'propertyAddress',
      subtitle: 'email',
      city: 'city',
    },
    prepare({title, subtitle, city}) {
      return {
        title: `${title}, ${city}`,
        subtitle: subtitle,
      }
    },
  },
})
