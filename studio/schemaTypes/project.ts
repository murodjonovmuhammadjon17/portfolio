import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Адрес страницы: /projects/<slug>. После публикации лучше не менять.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      description: 'Теги над названием, от 1 до 3',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      description: 'Показывать в блоке Selected work на главной',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Меньше число, выше в списке',
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({name: 'role', type: 'string'}),
    defineField({
      name: 'projectType',
      title: 'Type',
      type: 'string',
      description: 'Например: Student project',
    }),
    defineField({
      name: 'tools',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({name: 'scope', type: 'string'}),
    defineField({name: 'overview', type: 'text', rows: 5}),
    defineField({
      name: 'highlights',
      title: 'What is inside',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', type: 'text', rows: 2, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({name: 'coverImage', title: 'Cover image', type: 'figure'}),
    defineField({
      name: 'gallery',
      title: 'Selected screens',
      type: 'array',
      of: [defineArrayMember({type: 'figure'})],
    }),
    defineField({
      name: 'prototypeUrl',
      title: 'Prototype link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'shortDescription', media: 'coverImage'},
  },
})
