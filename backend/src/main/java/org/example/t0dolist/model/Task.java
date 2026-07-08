package org.example.t0dolist.model;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    // මෙතන තමයි අපි Enum එක පාවිච්චි කරන්නේ
    // EnumType.STRING දැම්මම Database එකේ සේව් වෙන්නේ "PENDING" කියන වචනය.
    // නැත්නම් 0, 1 කියලා ඉලක්කම් සේව් වෙන්නේ (ඒක හොයාගන්න අමාරුයි).
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    private LocalDate dueDate;

    // Industry Standard Trick එකක්:
    // අලුතින් Task එකක් සේව් කරද්දී කවුරුත් status එකක් එව්වේ නැත්නම්,
    // මේකෙන් default විදිහට PENDING කියලා දාගන්නවා.
    @PrePersist
    public void setDefaultStatus() {
        if (this.status == null) {
            this.status = TaskStatus.PENDING;
        }
    }



}
