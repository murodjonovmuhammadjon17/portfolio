import {defineField, defineType} from 'sanity'

// Изображение с обязательным alt-текстом и необязательной подписью.
// Используется везде, где на сайте есть картинки.
export const figure = defineType({
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Коротко опиши, что на картинке. Нужно для читалок с экрана и поиска.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'caption', type: 'string'}),
  ],
})
