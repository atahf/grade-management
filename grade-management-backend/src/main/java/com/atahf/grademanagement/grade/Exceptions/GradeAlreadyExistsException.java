package com.atahf.grademanagement.grade.Exceptions;

public class GradeAlreadyExistsException extends Exception {
    public GradeAlreadyExistsException() {
        super("Grade Already Exists!");
    }
}
