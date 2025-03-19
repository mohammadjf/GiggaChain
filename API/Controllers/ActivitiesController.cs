using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseAPIController
{
    [HttpGet]
    public async Task<ActionResult<Activity[]>> Activities()
    {
        return await context.Activities.ToArrayAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound();
        return activity;
    }
}