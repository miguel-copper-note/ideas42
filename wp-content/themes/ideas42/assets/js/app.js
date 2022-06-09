const $ = jQuery

$('.rotating-text').each((i, el) => {
  const delay = i * 200
  const $el = $(el)
  const $spans = $el.find('span')

  const observer = new ResizeObserver((entries) => {
    let width = 0
    console.log({ entries })
    for (let entry of entries) {
      const w = $(entry.target).outerWidth()
      width = w > width ? w : width
    }
    $el.css({ minWidth: width })
    $el.addClass('active')
  })

  $spans.each((i, span) => {
    observer.observe(span)
  })

  setTimeout(() => {
    $spans.first().addClass('current')

    if ( $spans.length <= 1 ) {
      return
    }

    setInterval(() => {
      const $current = $spans.filter('.current')
      const $next = $current.next()
      const $prev = $current.prevAll().first()

      if ( $next.length ) {
        $next.addClass('current')
        $current.removeClass('current')
      } else if ( $prev.length ) {
        $prev.addClass('current')
        $current.removeClass('current')
      }
    }, i * 500 + 5000)
  }, delay)
});
