import {defineArrayMember, defineField, defineType} from 'sanity'

// Кейс. Роль, инструменты и объём он берёт у связанного проекта.
// Правило: заполняй только то, что было на самом деле.
// Пустой раздел на сайте не показывается.
export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
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
      description: 'Адрес страницы: /case-studies/<slug>. После публикации лучше не менять.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'project',
      type: 'reference',
      to: [{type: 'project'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 2,
      description: 'Одно предложение: какая была проблема и что ты сделал',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({name: 'coverImage', title: 'Cover image', type: 'figure'}),
    defineField({name: 'overview', type: 'text', rows: 4}),
    defineField({
      name: 'problem',
      title: 'Context and problem',
      type: 'text',
      rows: 4,
      description: 'Какая проблема была и откуда задача. Честно, без выдумок.',
    }),
    defineField({
      name: 'goals',
      title: 'Goals and constraints',
      type: 'array',
      of: [defineArrayMember({type: 'caseCard'})],
    }),
    defineField({
      name: 'users',
      title: 'Target users',
      type: 'text',
      rows: 3,
      description: 'Необязательно. Персону добавляй только если ты её действительно создавал.',
    }),
    defineField({
      name: 'research',
      title: 'Research and insights',
      type: 'array',
      description: 'Необязательно. Если исследования не было, оставь пустым.',
      of: [defineArrayMember({type: 'caseCard'})],
    }),
    defineField({
      name: 'process',
      title: 'User flow and wireframes',
      type: 'array',
      of: [defineArrayMember({type: 'figure'})],
    }),
    defineField({
      name: 'decisions',
      title: 'Design decisions',
      type: 'array',
      description: 'Заголовок: что выбрал. Текст: какая была альтернатива и почему выбрано это.',
      of: [defineArrayMember({type: 'caseCard'})],
    }),
    defineField({
      name: 'finalUI',
      title: 'Final UI',
      type: 'array',
      of: [defineArrayMember({type: 'figure'})],
    }),
    defineField({
      name: 'designSystem',
      title: 'Design system',
      type: 'object',
      description: 'Необязательно. Покажи токены, компоненты и варианты, если они были частью работы.',
      fields: [
        defineField({name: 'text', type: 'text', rows: 3}),
        defineField({name: 'image', type: 'figure'}),
      ],
    }),
    defineField({
      name: 'prototypeUrl',
      title: 'Prototype link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes and lessons learned',
      type: 'array',
      description: 'Что сделано, чему научился, что делал бы дальше. Метрики только настоящие.',
      of: [defineArrayMember({type: 'caseCard'})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'project.title', media: 'coverImage'},
  },
})
