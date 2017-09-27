export const rupiah = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n)

