package com.atahf.grademanagement.grade.Exceptions;

public class ScoreOutOfBoundsException extends Exception {
    public ScoreOutOfBoundsException() {
        super("Grade Should Be Between 0 and 100!");
    }
}
