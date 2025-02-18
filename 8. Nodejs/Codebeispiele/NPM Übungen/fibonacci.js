import fibonacci, {kill, iterate} from 'fibonacci';

fibonacci.on ('result', num => {
    console.log (`${num.number}`);
  
    if (num.iterations > 10) {
      console.log ('Done!');
      kill();
    }
  });
  
  // run this AFTER everything
  iterate();