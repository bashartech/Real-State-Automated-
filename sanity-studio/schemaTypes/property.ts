import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'property',
  title: 'Properties',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
    }),
    defineField({
      name: 'sqft',
      title: 'Square Feet',
      type: 'number',
    }),
    defineField({
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          {title: 'Single Family', value: 'Single Family'},
          {title: 'Condo', value: 'Condo'},
          {title: 'Townhouse', value: 'Townhouse'},
          {title: 'Land', value: 'Land'},
          {title: 'Luxury', value: 'Luxury'},
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'Active'},
          {title: 'Pending', value: 'Pending'},
          {title: 'Sold', value: 'Sold'},
        ],
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'string',
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Year Built',
      type: 'number',
    }),
    defineField({
      name: 'lotSize',
      title: 'Lot Size',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'address',
      media: 'images.0',
    },
  },
})
