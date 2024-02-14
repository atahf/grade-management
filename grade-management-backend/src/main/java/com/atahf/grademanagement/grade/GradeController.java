package com.atahf.grademanagement.grade;

import com.atahf.grademanagement.grade.Exceptions.GradeAlreadyExistsException;
import com.atahf.grademanagement.grade.Exceptions.GradeNotFoundException;
import com.atahf.grademanagement.grade.Exceptions.IllegalSortFilterException;
import com.atahf.grademanagement.grade.Exceptions.ScoreOutOfBoundsException;
import com.atahf.grademanagement.grade.GradeDto.NewGradeDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("api/v1/grades")
public class GradeController {
    private final GradeService gradeService;

    @GetMapping("all")
    public ResponseEntity<?> getAll(@RequestParam(required = false) String sort) {
        try {
            List<Grade> grades = gradeService.getAll(sort);
            return ResponseEntity.ok(grades);
        } catch (IllegalSortFilterException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getAll(@PathVariable Long id) {
        try {
            Grade grade = gradeService.get(id);
            return ResponseEntity.ok(grade);
        } catch (GradeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody NewGradeDto newGradeDto) {
        try {
            gradeService.add(newGradeDto);
            return ResponseEntity.ok("Grade Successfully Added!");
        } catch (GradeAlreadyExistsException | ScoreOutOfBoundsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            gradeService.delete(id);
            return ResponseEntity.ok("Grade Successfully Deleted!");
        } catch (GradeNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
