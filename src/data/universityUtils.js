import { images } from './images'

const filenameMap = {
  'country-switzerland.png': images.switzerland,
  'country-italy.png': images.italy,
  'canada.jpg': images.canada,
  'california.jpg': images.california,
  'belgium.jpg': images.belgium,
  'india-university.jpg': images.indiaUniversity,
  'university-global.png': images.university,
}

export function resolveUniversityImage(image) {
  if (!image) return images.university
  if (image.startsWith('http') || image.startsWith('/')) return image
  const filename = image.replace(/^.*\//, '')
  return filenameMap[filename] || `/images/${filename}`
}

export function normalizeUniversity(uni) {
  return {
    ...uni,
    image: resolveUniversityImage(uni.image),
    applyLink: uni.applyLink || '/scholarships/apply',
    programs: uni.programs || [],
    requirements: uni.requirements || [],
    highlights: uni.highlights || [],
  }
}
