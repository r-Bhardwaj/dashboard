from .models import Items, Category, Tag
from .serializers import ItemsSerializer, CategorySerializer, UserSerializer, TagSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET','POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def item_list(request,format=None):
    if request.method == "GET":
        items=Items.objects.all()
        serializer=ItemsSerializer(items,many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer=ItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def item_detail(request,id,format=None):
    try:
        item = Items.objects.get(pk=id)
    except Items.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    if request.method == "GET":
        serializer=ItemsSerializer(item)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer=ItemsSerializer(item,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET','POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def category(request,format=None):
    if request.method == "GET":
        categories=Category.objects.all()
        serializer=CategorySerializer(categories,many=True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.status.HTTP_409_CONFLICT)

        
@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def tag(request,format=None):
    if request.method == "GET":
        tags=Tag.objects.all()
        serializer=CategorySerializer(tags,many=True)
        return Response(serializer.data)

@api_view(['POST'])
def signup(request, format=None):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request,format=None):
    user = get_object_or_404(User,username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response({"detail":"Not Found."},status=status.HTTP_404_NOT_FOUND)
    token,created=Token.objects.get_or_create(user=user)
    serializer=UserSerializer(instance=user)
    return Response({"token":token.key})

@api_view(['POST'])
def forgot_password(request):
    email=request.data.get('email')
    user = get_object_or_404(User,email=email)
    if user:
        link=f"http://localhost:8000/resetPassword/{user.username}/"
        send_mail(
            "Reset Password",
            "Please Reset Your Password",
            "kaizantreeapp@outlook.com",
            [email],
            fail_silently=False,
            html_message=f"<p>Reset Link:</p><p><a href='{link}'>{link}</a></p>"
        )
        return Response({"detail":"Please check your email"},status=status.HTTP_200_OK)
    return Response({"detail":"User Not Found."},status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request,username):
    user = get_object_or_404(User,username=username)
    if user:
        return Response({"detail":"Password Reset"},status=status.HTTP_200)
    return Response({"detail":"User Not Found."},status=status.HTTP_404_NOT_FOUND)