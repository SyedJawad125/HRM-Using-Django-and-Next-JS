# Generated by Django 5.0.3 on 2024-09-06 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hrm_app', '0007_department_dept_have_roles'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='department',
            name='dept_have_roles',
        ),
    ]
