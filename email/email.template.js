module.exports = {

    confirm: id => ({
      subject: 'Confirm Email',
      html: `
        <a href='/'>
          click to confirm email
        </a>
      `,
      text: `Copy and paste this link: https://...............`
    })  
  }