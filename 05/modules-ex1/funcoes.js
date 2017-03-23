module.exports = (x)=>{

  var par = () => x % 2 == 0 ? true: false;

  return {
    msg: 'O valor é par? ',
    value: par()
  };

};
