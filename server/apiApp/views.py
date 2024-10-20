# imports used by Django
from django.shortcuts import render
from django.contrib.auth.hashers import make_password,check_password

from apiApp.models import user_cred,todo_data

# imports used by rest_api
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request, format=None):
    return Response({'message': 'Welcome to the ToDo API'})


# Create your views here.

@api_view(['POST'])
def login(request,format=None):
    username=request.data['username']
    password=request.data['password']
    
# to check whether username is existing in database or not(created ot not)
    try:
        user_get=user_cred.objects.get(username = username)
    except:
        return Response({'message':'User does not exist'})
    
# to check whether user has entered correct password or not
    if (check_password(password,user_get.password)): 
      return Response({ 
          'message':'Successfully Logined',
                    })
    else:
        return Response({ 
          'message':'Wrong Credentials',
                    })
    
# to create a new todo using creation api
@api_view(['POST'])
def create_todo(request,format=None):
    # title_input=request.data['title']
    # desc_input=request.data['desc']
    title_input = request.data.get('title')
    desc_input = request.data.get('desc')


    if not title_input or not desc_input:
        return Response({'message': 'Title and Description are required'}, status=400)
    
    status_input='in_progress'
    obj=todo_data(
        title=title_input,
        desc=desc_input,
        status=status_input
    )

    obj.save()
    return Response({'message':'Todo created successfully'})

# to get the total count of each category
@api_view(['GET'])
def initial_call(request,format=None):
    all = todo_data.objects.all().values().count()
    completed = todo_data.objects.filter(status='completed').values().count()
    in_progress = todo_data.objects.filter(status='in_progress').values().count()
    archived = todo_data.objects.filter(status='archived').values().count()
    stat=[
        {
            "label":"All",
            "value": all
        },
        {
            "label":"Completed",
            "value": completed
        },
        {
            "label":"inProgress",
            "value": in_progress
        },
        {
            "label":"Archived",
            "value": archived 
        },
    ]
    todo=todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({'message':' Successful',
                     'stats': stat,
                     'todo_data':todo,
                     })

# to get only content of completed activity
@api_view(['GET'])
def completed(request,format=None):
    obj = todo_data.objects.filter(status='completed').values('id','title','desc','status')
    return Response({'message':' Successful',
                     'todo_data':obj,
                     })

# to get only content of activities in progress
@api_view(['GET'])
def in_progress(request,format=None):
    obj = todo_data.objects.filter(status='in_progress').values('id','title','desc','status')
    return Response({'message':' Successful',
                     'todo_data':obj,
                     })

# to get only content of activities that are archived
@api_view(['GET'])
def archived(request,format=None):
    obj = todo_data.objects.filter(status='archived').values('id','title','desc','status')
    return Response({'message':' Successful',
                     'todo_data':obj,
                     })

@api_view(['POST'])
def complete_task(request,format=None):
    task_id = request.data['id']
    obj= todo_data.objects.filter(id = task_id).update(status = 'completed')

    all = todo_data.objects.all().values().count()
    completed = todo_data.objects.filter(status='completed').values().count()
    in_progress = todo_data.objects.filter(status='in_progress').values().count()
    archived = todo_data.objects.filter(status='archived').values().count()
    stat=[
        {
            "label":"All",
            "value": all
        },
        {
            "label":"Completed",
            "value": completed
        },
        {
            "label":"inProgress",
            "value": in_progress
        },
        {
            "label":"Archived",
            "value": archived 
        },
    ]
    todo=todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({'message':' Successful',
                     'stats': stat,
                     'todo_data':todo,
                     })


@api_view(['POST'])
def archived_task(request,format=None):
    task_id = request.data['id']
    obj= todo_data.objects.filter(id = task_id).update(status = 'archived')
    # archives task of that particular id 

    all = todo_data.objects.all().values().count()
    completed = todo_data.objects.filter(status='completed').values().count()
    in_progress = todo_data.objects.filter(status='in_progress').values().count()
    archived = todo_data.objects.filter(status='archived').values().count()
    stat=[
        {
            "label":"All",
            "value": all
        },
        {
            "label":"Completed",
            "value": completed
        },
        {
            "label":"inProgress",
            "value": in_progress
        },
        {
            "label":"Archived",
            "value": archived 
        },
    ]
    todo=todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({'message':' Successful',
                     'stats': stat,
                     'todo_data':todo,
                     })

@api_view(['DELETE'])
def delete_task(request,format=None):
    task_id = request.data['id']
    obj = todo_data.objects.filter(id = task_id).delete()
    # deletes task of that particular id 
     
    all = todo_data.objects.all().values().count()
    completed = todo_data.objects.filter(status='completed').values().count()
    in_progress = todo_data.objects.filter(status='in_progress').values().count()
    archived = todo_data.objects.filter(status='archived').values().count()
    stat=[
        {
            "label":"All",
            "value": all
        },
        {
            "label":"Completed",
            "value": completed
        },
        {
            "label":"inProgress",
            "value": in_progress
        },
        {
            "label":"Archived",
            "value": archived 
        },
    ]
    todo=todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({'message':' Successful',
                     'stats': stat,
                     'todo_data':todo,
                     })

@api_view(['PUT'])
def update_task(request,format=None):
    task_id = request.data['id']
    task_title = request.data['title']
    task_desc = request.data['desc']
    obj = todo_data.objects.filter(id = task_id).update(title = task_title,desc = task_desc)

    all = todo_data.objects.all().values().count()
    completed = todo_data.objects.filter(status='completed').values().count()
    in_progress = todo_data.objects.filter(status='in_progress').values().count()
    archived = todo_data.objects.filter(status='archived').values().count()
    stat=[
        {
            "label":"All",
            "value": all
        },
        {
            "label":"Completed",
            "value": completed
        },
        {
            "label":"inProgress",
            "value": in_progress
        },
        {
            "label":"Archived",
            "value": archived 
        },
    ]
    todo=todo_data.objects.exclude(status = 'archived').all().values('id','title','desc','status')
    return Response({'message':' Successful',
                     'stats': stat,
                     'todo_data':todo,
                     })






# how we can encrypt password and store it in database
# @api_view(['POST'])
# def create_user(request,format=None):
#     user=request.data['username']
#     password=request.data['password']
#     enc_pass=make_password(password)
#     obj= user_cred(
#         username = user,
#         password = enc_pass
#     ) 
#     obj.save()

#     return Response({'message':'User Created' })


# makepassword and checkpassword are libraries of django
    
 