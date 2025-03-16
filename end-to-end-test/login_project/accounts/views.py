# from django.contrib.auth import authenticate, login
# from django.shortcuts import render
# from django.http import JsonResponse
# from django.contrib.auth.models import User

# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         # Authenticate user
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'}, status=200)
#         else:
#             return JsonResponse({'error': 'Invalid credentials'}, status=400)

#     return render(request, 'accounts/login.html')


import json
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    try:
        data = json.loads(request.body)  # Get the JSON data from the request body
        username = data.get('username')
        password = data.get('password')
        
        # Authenticate the user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

