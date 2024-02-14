package com.atahf.grademanagement.grade;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeDao extends JpaRepository<Grade, Long> {
    @Query("SELECT g FROM Grade g WHERE g.id = :id")
    Grade findGradeById(Long id);
    @Query("SELECT g FROM Grade g WHERE upper(g.studentName) = upper(:studentName)")
    Grade findByStudentName(String studentName);

    List<Grade> findByOrderByIdAsc();
    List<Grade> findByOrderByIdDesc();
    List<Grade> findByOrderByStudentNameAsc();
    List<Grade> findByOrderByStudentNameDesc();
    List<Grade> findByOrderByScoreAsc();
    List<Grade> findByOrderByScoreDesc();
}
