// 懒加载
export function onIntersection(element, callback) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(element)
        }
      })
    },
    { threshold: 0.5 }
  )

  observer.observe(element)
}
