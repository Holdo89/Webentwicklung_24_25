import fibonacci from "fibonacci"

fibonacci.on ('result', num => {
    console.log (`${num.number}`);
  
    if (num.iterations > 10) {
      console.log ('Done!');
      fibonacci.kill();
    }
  });
  
  // run this AFTER everything
  fibonacci.iterate();