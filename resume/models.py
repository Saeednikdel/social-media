from django.db import models
from accounts.models import UserAccount

LEVEL_CHOICES = (
    ('junior', 'junior'),
    ('mid-level', 'mid-level'),
    ('senior', 'senior'),
)

LANG_LEVEL = (
    ('read and write', 'read & write'),
    ("comprehension", 'comprehension'),
    ('speaking', 'speaking'),
)


class EducationDegree(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    end_date = models.DateField()
    campus = models.CharField(max_length=255)
    score = models.FloatField()

    def __str__(self):
        return self.user.email

class JobHistory(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    company = models.CharField(max_length=255)

    def __str__(self):
        return self.user.email

class Skill(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    level = models.CharField(choices=LEVEL_CHOICES, max_length=15)

    def __str__(self):
        return self.user.email

class Language(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    level = models.CharField(choices=LANG_LEVEL, max_length=15)

    def __str__(self):
        return self.user.email

class Resume(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    educations = models.ManyToManyField(EducationDegree)
    job_histories = models.ManyToManyField(JobHistory)
    skills = models.ManyToManyField(Skill)
    languages = models.ManyToManyField(Language)

    def __str__(self):
        return self.user.email