from django.db import models
from accounts.models import UserAccount

LEVEL_CHOICES = (
    ('W', 'weak'),
    ('N', 'normal'),
    ('G', 'good'),
    ('E', 'exellent')
)

LANG_CHOICES = (
    ('R', 'read & write'),
    ('S', 'speaking'),
    ('A', 'all')
)

MILITARY_CHOICES =(
    ('N', 'nothing'),
    ('C', 'completed'),
    ('E', 'exempt')
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
    level = models.CharField(choices=LEVEL_CHOICES, max_length=1)
    end_date = models.DateField()
    certificate = models.CharField(max_length=255)

    def __str__(self):
        return self.user.email

class Language(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    level = models.CharField(choices=LEVEL_CHOICES, max_length=1)
    lang_skills = models.CharField(choices=LANG_CHOICES, max_length=1)
    end_date = models.DateField()
    certificate = models.CharField(max_length=255)

    def __str__(self):
        return self.user.email

class Resume(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    educations = models.ManyToManyField(EducationDegree)
    job_histories = models.ManyToManyField(JobHistory)
    skills = models.ManyToManyField(Skill)
    languages = models.ManyToManyField(Language)
    militry_service = models.CharField(choices=MILITARY_CHOICES, max_length=1)
    address = models.CharField(max_length=1000)

    def __str__(self):
        return self.user.email