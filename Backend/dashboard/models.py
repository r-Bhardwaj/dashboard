from django.db import models

class Tag(models.Model):
    name=models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Items(models.Model):
    sku=models.CharField(max_length=255,unique=True)
    name=models.CharField(max_length=255)
    category=models.ForeignKey(Category, on_delete=models.CASCADE)
    tags=models.ManyToManyField(Tag, blank=True)
    stock_status=models.IntegerField()
    available_stock=models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.category.name}"
