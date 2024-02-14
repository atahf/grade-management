package com.atahf.grademanagement.grade;

import com.atahf.grademanagement.grade.Exceptions.GradeAlreadyExistsException;
import com.atahf.grademanagement.grade.Exceptions.GradeNotFoundException;
import com.atahf.grademanagement.grade.Exceptions.IllegalSortFilterException;
import com.atahf.grademanagement.grade.Exceptions.ScoreOutOfBoundsException;
import com.atahf.grademanagement.grade.GradeDto.NewGradeDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class GradeService {
    private final GradeDao gradeDao;

    public List<Grade> getAll(String sort) throws IllegalSortFilterException {
        if(sort == null || sort.isEmpty()) {
            return gradeDao.findAll();
        } else if(sort.equals("id")) {
            return gradeDao.findByOrderByIdAsc();
        } else if(sort.equals("id-desc")) {
            return gradeDao.findByOrderByIdDesc();
        } else if(sort.equals("name")) {
            return gradeDao.findByOrderByStudentNameAsc();
        } else if(sort.equals("name-desc")) {
            return gradeDao.findByOrderByStudentNameDesc();
        } else if(sort.equals("score")) {
            return gradeDao.findByOrderByScoreAsc();
        } else if(sort.equals("score-desc")) {
            return gradeDao.findByOrderByScoreDesc();
        }

        throw new IllegalSortFilterException();
    }

    public Grade get(Long id) throws Exception {
        Grade grade = gradeDao.findGradeById(id);
        if(grade == null) throw new GradeNotFoundException();

        return grade;
    }

    @Transactional
    public void add(NewGradeDto newGradeDto) throws GradeAlreadyExistsException, ScoreOutOfBoundsException {
        Grade grade = gradeDao.findByStudentName(newGradeDto.studentName());
        if(grade != null) throw new GradeAlreadyExistsException();

        if(newGradeDto.score() < 0 || newGradeDto.score() > 100) throw new ScoreOutOfBoundsException();

        Grade newGrade = Grade.builder()
                .studentName(newGradeDto.studentName())
                .score(newGradeDto.score())
                .build();

        gradeDao.save(newGrade);
    }

    @Transactional
    public void delete(Long id) throws Exception {
        Grade grade = gradeDao.findGradeById(id);
        if(grade == null) throw new GradeNotFoundException();

        gradeDao.delete(grade);
    }
}
