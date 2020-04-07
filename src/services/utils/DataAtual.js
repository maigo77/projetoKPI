const now = new Date;

function formataMes(mes){
  if(mes < 10){
    return `0` + mes;
  }else{
    return mes;
  }
}

export const mes = formataMes(now.getMonth() + 1);
export const ano = now.getFullYear();
