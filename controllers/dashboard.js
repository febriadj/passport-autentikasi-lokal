'use strict'

const conn = require('../config/database')

exports.dashboardPage = async (req, res, next) => {
  try {
    if (!req.session.passport) return res.status(200).render('index')

    const sql = await 'SELECT * FROM users WHERE id = ?'
    
    conn.query(sql, [req.session.passport.user], (err, result) => {
      if (err) throw err

      async function createdDate() {
        const date = await new Date(result[0].created_at)
        const config = date.toLocaleDateString('id-ID', {
          weekday: 'long', 
          day: '2-digit', 
          month: 'long', 
          year: 'numeric',
          hour: '2-digit', 
          minute: '2-digit', 
          timeZone: 'Asia/Jakarta', 
          timeZoneName: 'short'
        })

        return config
      }

      async function render() {
        const created = await createdDate()

        res.status(200).render('dashboard', {
          title: result[0].username,
          userDetails: result[0],
          created
        })
      }

      render()
    })
  }
  catch(err) {
    console.log(err)
  }
}