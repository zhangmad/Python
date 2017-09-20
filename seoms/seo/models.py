from __future__ import unicode_literals

from django.db import models


class Indexed(models.Model):
    i_id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    site = models.CharField(db_column='Site', max_length=50)  # Field name made lowercase.
    domain = models.CharField(db_column='Domain', max_length=50)  # Field name made lowercase.
    url = models.CharField(db_column='URL', max_length=50)  # Field name made lowercase.
    indexed = models.IntegerField(db_column='Indexed')  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    create_time = models.DateTimeField(db_column='Create_time')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'indexed'


class SearchEngine(models.Model):
    se_id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    value = models.CharField(db_column='Value', max_length=50)  # Field name made lowercase.
    sort_name = models.CharField(db_column='Sort_name', max_length=50)  # Field name made lowercase.
    se_type = models.CharField(db_column='Type', max_length=50)  # Field name made lowercase.
    search_url = models.CharField(db_column='Search_url', max_length=50, blank=True, null=True)  # Field name made lowercase.
    is_mobile = models.IntegerField(db_column='Is_mobile')  # Field name made lowercase.
    order_num = models.IntegerField(db_column='Order_num')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'search_engine'


class SiteDict(models.Model):
    sd_id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    site_type = models.CharField(db_column='Type', max_length=50)  # Field name made lowercase.
    value = models.CharField(db_column='Value', max_length=50)  # Field name made lowercase.
    sort_name = models.CharField(db_column='Sort_name', max_length=50)  # Field name made lowercase.
    is_mobile = models.IntegerField(db_column='Is_mobile')  # Field name made lowercase.
    use_search_engine = models.CharField(db_column='Use_search_engine', max_length=50)  # Field name made lowercase.
    order_num = models.IntegerField(db_column='Order_num')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'site_dict'


class Test(models.Model):
    test_id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=50)
    number = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'test'
