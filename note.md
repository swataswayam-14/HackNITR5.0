Database architecture:-->

1.Student (...acc details , id1-> ref(course), id2 -> ref(teacher))
2.Course (course_name,details,  id1 -> ref(teacher))
3.Lecture (name , details, id1 -> ref(course))
4.Teacher (...acc details , main id)