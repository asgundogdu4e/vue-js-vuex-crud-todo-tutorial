create table todos(
  id              serial          	not null,
    constraint pk___todos___id primary key(id),   
  task                Text    		not null,
  description         Text    		null,  
  completed           Boolean         not null    default false
);

create table tutorials(
  id              serial          	not null,
    constraint pk___tutorials___id primary key(id),   
  title                Text    		not null,
  description         Text    		null,  
  published           Boolean         not null    default false
);