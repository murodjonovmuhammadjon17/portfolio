import {defineField, defineType} from 'sanity'

// Карточка внутри кейса: цель, находка, решение, урок.
export const caseCard = defineType({
  name: 'caseCard',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'kicker',
      type: 'string',
      description: 'Маленькая подпись над заголовком, например Goal, Limit, Finding. Можно оставить пустой.',
    }),
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', type: 'text', rows: 3, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'kicker'}},
})
