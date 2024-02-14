package com.atahf.grademanagement.grade.Exceptions;

public class GradeNotFoundException extends Exception {
    public GradeNotFoundException() {
        super("Grade Does Not Exist!");
    }
}
