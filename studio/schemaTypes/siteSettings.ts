import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'tagline', type: 'string'}),
    defineField({name: 'description', type: 'text', rows: 2}),
    defineField({
      name: 'email',
      type: 'string',
      description: 'Только адрес, например name@example.com',
      validation: (r) => r.email(),
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'telegram',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
