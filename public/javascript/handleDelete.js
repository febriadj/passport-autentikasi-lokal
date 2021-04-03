function handleDelete() {
  const ask = confirm('Apa kamu yakin akan menghapus akun ini?')
  if (ask == false) return window.location.href = '/'

  fetch('http://localhost:8080/delete', {
    method: 'GET'
  })
  .then(() => {
    window.location.href = '/'
  })
  .catch(err => console.log(err))
}