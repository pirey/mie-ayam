export const rupiah = n =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n)

export const readFile = file =>
  new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = e => {
      const src = e.target.result
      res(src)
    }
    reader.readAsDataURL(file)
  })
