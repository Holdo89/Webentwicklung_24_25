import fibonacci  from 'fibonacci';
fibonacci.on ('result', num => {
    console.log (`${num.iterations} / ${num.number}\n`);
  
    if (num.iterations > 10) {
      console.log ('Done!');
      fibonacci.kill();
    }
  });
  
  // run this AFTER everything
fibonacci.iterate();
