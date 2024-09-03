use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct User {
    pub name: String, //4 + 256
    pub authority: Pubkey,//32
    pub last_post_id: u8,//1
    pub post_count: u8,//1
}

#[account]
#[derive(Default)]
pub struct Post {
    pub id: u8, //1
    pub title: String, //4 + 256
    pub media: String, //4 + 2048
    pub content: String, //4 + 50000
    pub source: String, //4 + 256
    pub proof: String, // 132
    pub user: Pubkey, // 32
    pub authority: Pubkey, // 32
}